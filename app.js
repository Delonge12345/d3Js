// d3.select();
// d3.selectAll();


const dataArr = [
    {country:'Russia', population:'1'},
    {country:'China', population:'2'},
    {country:'India', population:'3'},
    {country:'Mexico', population:'4'},
    {country:'USA', population:'5'},
]

const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
    const xValue =  d => d.population;
    const yValue = d => d.country;
    const margin = { top: 20 , right: 20, bottom: 20, left: 200};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.bottom - margin.top;

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0, innerWidth])

    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])

     const yAxis = d3.axisLeft(yScale);

     const g = svg.append('g')
     .attr('transform', `translate(${margin.left}, ${margin.top})`)
 
    yAxis(g.append('g'));

    g.selectAll('rect').data(data)
        .enter()
        .append('rect')
        .attr('y', d => yScale(yValue(d)))
        .attr('width', d => xScale(xValue(d)))
        .attr('height', yScale.bandwidth())
}

dataArr.forEach(d => {
    d.population = +d.population;
    render(dataArr)
});


