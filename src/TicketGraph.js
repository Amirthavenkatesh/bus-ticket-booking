import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TicketGraph = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        console.log("Data passed to the graph:", data);

        if (!data || data.length === 0) {
            console.error("No data available for plotting");
            return;
        }

        // Clear the previous graph
        d3.select(svgRef.current).selectAll('*').remove();

        const margin = { top: 20, right: 30, bottom: 60, left: 50 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Prepare the x and y scales
        const x = d3.scaleBand()
            .domain(data.map(d => d.destination)) // Destination names for x-axis
            .range([0, width])
            .padding(0.3); // Increase padding to make bars thinner

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.numPassengers)]) // Max passengers for y-axis
            .range([height, 0]);

        // Create x and y axes
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll('text')  // Rotate x-axis labels for better visibility
            .attr('transform', 'rotate(-45)')
            .attr('text-anchor', 'end');

        svg.append('g')
            .call(d3.axisLeft(y));

        // Draw bars
        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.destination))
            .attr('y', d => y(d.numPassengers))
            .attr('width', x.bandwidth() * 0.7) // Make the bars 70% of the original width
            .attr('height', d => height - y(d.numPassengers))
            .attr('fill', 'steelblue')
            .on('mouseover', function(event, d) {
                d3.select(this).attr('fill', 'orange');
            })
            .on('mouseout', function(d) {
                d3.select(this).attr('fill', 'steelblue');
            });

    }, [data]);

    return (
        <svg ref={svgRef}></svg>
    );
};

export default TicketGraph;

