import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { GraphProps } from "../../../auxiliary/interfaces/GraphProps";
import styles from "./TurnoverGraph.module.css";

const TurnoverGraph: React.FC<GraphProps> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.amount) as number])
      .range([innerHeight, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g").call(d3.axisLeft(yScale));

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.date) as number)
      .attr("y", (d) => yScale(d.amount))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.amount))
      .attr("fill", "blue");
  }, [data, width, height]);

  return (
    <div className={styles.graph}>
      <h6 className={styles.h6}>Turnover</h6>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default TurnoverGraph;
