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

function HistoryDiagram({ diagramData }) {

  
  return (

    <div>
      <Chart
        id='zoomedChart'
        dataSource={diagramData}
      >
        <CommonSeriesSettings
          argumentField='Date'
          type='candlestick'
        />
        <Series
          openValueField='Open'
          highValueField='High'
          lowValueField='Low'
          closeValueField='Close'

        >
          <Aggregation enabled={true} />
          <Reduction color='red' />
        </Series>
        <ArgumentAxis
          valueMarginsEnabled={false}
          argumentType='datetime'
        >
          <Label visible={false} />
        </ArgumentAxis>
        <ValueAxis valueType='numeric' />
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
          <RsValueAxis valueType='numeric' />
          <RsSeries
            type='line'
            valueField='Open'
            argumentField='Date'
          >
          </RsSeries>
        </RsChart>
      </RangeSelector>
    </div>
  )
}

export default HistoryDiagram