import { PieChart } from 'react-minimal-pie-chart'
import { useQuery } from '@tanstack/react-query'
import '../styles/ColorCharts.css'

type Color = {
    color_id: number
    name: string
    hex: string
}

type CoasterColorJoin = {
    color_id: number
    color: Color
}

type Coaster = {
    coaster_id: number
    name: string
    track_colors: CoasterColorJoin[]
    support_colors: CoasterColorJoin[]
}

type PieDatum = {
    title: string
    value: number
    color: string
}

function normalizeHex(hex: string): string {
    const h = (hex ?? '').trim()
    if (!h) return '#999999'
    return h.startsWith('#') ? h : `#${h}`
}

function countColors(coasters: Coaster[], key: 'track_colors' | 'support_colors'): PieDatum[] {
    const map = new Map<number, { name: string; hex: string; count: number }>()

    for (const coaster of coasters) {
        for (const join of coaster[key] ?? []) {
            const c = join.color
            if (!c) continue

            const existing = map.get(c.color_id)
            if (existing) existing.count += 1
            else map.set(c.color_id, { name: c.name, hex: c.hex, count: 1 })
        }
    }

    return Array.from(map.values())
        .sort((a, b) => b.count - a.count)
        .map(v => ({ title: v.name, value: v.count, color: normalizeHex(v.hex) }))
}

async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url)
    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(`${res.status} ${res.statusText} - ${text}`)
    }
    return res.json() as Promise<T>
}

function Legend({ data }: { data: PieDatum[] }) {
    return (
        <ul className="ColorChartsLegend">
            {data.map(d => (
                <li key={d.title} className="ColorChartsLegendItem">
                    <span className="ColorChartsSwatch" style={{ background: d.color }} />
                    <span>{d.title}</span>
                    <span className="ColorChartsCount">{d.value}</span>
                </li>
            ))}
        </ul>
    )
}

function ColorCharts() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['coasters-with-colors'],
        queryFn: () => fetchJson<Coaster[]>('/endpoint/coasters'),
    })

    const coasters = data ?? []
    const trackData = countColors(coasters, 'track_colors')
    const supportData = countColors(coasters, 'support_colors')

    return (
        <section className="ColorCharts" id="Colors">
            <div className="ColorChartsDisplay">
                <h1>Colors</h1>
            </div>

            <div className="ColorChartsContent">
                {isLoading && <div>Loading...</div>}
                {error && <div>Error: {(error as Error).message}</div>}

                {!isLoading && !error && (
                    <div className="ColorChartsGrid">
                        <div className="ColorChartsCard">
                            <h2>Track Colors</h2>
                            {trackData.length === 0 ? (
                                <div>No data</div>
                            ) : (
                                <>
                                    <PieChart data={trackData} lineWidth={50} paddingAngle={2} rounded />
                                    <Legend data={trackData} />
                                </>
                            )}
                        </div>

                        <div className="ColorChartsCard">
                            <h2>Support Colors</h2>
                            {supportData.length === 0 ? (
                                <div>No data</div>
                            ) : (
                                <>
                                    <PieChart data={supportData} lineWidth={50} paddingAngle={2} rounded />
                                    <Legend data={supportData} />
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ColorCharts

