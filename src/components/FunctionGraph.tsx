import { ResponsiveLine } from "@nivo/line"
import { FC } from "react"
import { FuncData } from "../types/function"

interface Handler {
    handleApprox: (x: number) => void
}
export const FunctionGraph:FC<FuncData & Handler> = ({data, handleApprox}) => {
    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
            xScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'x',
                legendOffset: 30,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Y',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            yFormat=" >-.2f"
            xFormat=" >-.2f"
            lineWidth={2}
            enablePoints={false}
            isInteractive={true}
            useMesh={true}
            onClick={data => handleApprox(+data.data.x)}
        />
    )
}