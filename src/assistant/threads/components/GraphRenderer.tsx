import Plot from 'react-plotly.js';

interface Props {
  data: any;
  layout: any;
}
const GraphRenderer = ({ data, layout }: Props) => {
  return (
    <Plot
      data={data}
      layout={{
        ...layout,
        font: { color: 'white' },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
      }}
    />
  );
};

export default GraphRenderer;
