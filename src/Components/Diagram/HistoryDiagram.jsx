import React from 'react';

import Chart, {
  CommonSeriesSettings,
  Series,
  Reduction,
  ArgumentAxis,
  Label,
  ValueAxis,
  Legend,
  Export,
  Tooltip,
  Aggregation,
  Margin
} from 'devextreme-react/chart';

import RangeSelector, {
  Size,
  Chart as RsChart,
  ValueAxis as RsValueAxis,
  Series as RsSeries
} from 'devextreme-react/range-selector';

import '../../Styles/LoadersSection/loader.css';

function HistoryDiagram({ name, loading, diagramData }) {


  return (
    <div className='row my-4 mx-0 bg-dark border rounded'>

      {!loading ?
        <>
          <Chart
            id="zoomedChart"
            dataSource={diagramData}
            title={name}
          >
            <CommonSeriesSettings
              argumentField='Date'
              type="candlestick"
            />
            <Series
              openValueField="Open"
              highValueField="High"
              lowValueField="Low"
              closeValueField="Close"

            >
              <Aggregation enabled={true} />
              <Reduction color="red" />
            </Series>
            <ArgumentAxis
              valueMarginsEnabled={false}
              argumentType="datetime"
            >
              <Label visible={false} />
            </ArgumentAxis>
            <ValueAxis valueType="numeric" />
            <Margin right={10} />
            <Legend visible={false} />
            <Tooltip enabled={true} />
            <Export enabled={true} />
          </Chart>
          <RangeSelector
            dataSource={diagramData}
          >
            <Size height={120} />
            <RsChart>
              <RsValueAxis valueType="numeric" />
              <RsSeries
                type="line"
                valueField="Open"
                argumentField="Date"
              >
              </RsSeries>
            </RsChart>
          </RangeSelector>
        </>
        : <p className='rounded text-center text-light fs-5 mx-auto p-4 my-3 loading'>Loading...</p>}

    </div>
  )

}

export default HistoryDiagram