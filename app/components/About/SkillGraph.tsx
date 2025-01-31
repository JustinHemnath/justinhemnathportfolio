import * as d3 from "d3";
import data from "./data.json";
import { useEffect, useRef } from "react";

const SkillGraph = ({ skillGraphContainerRef, isInView }: any) => {
  const skillGraphRef = useRef<SVGSVGElement>(null);

  // Specify the dimensions of the chart.

  // Reheat the simulation when drag starts, and fix the subject position.
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  // Update the subject (dragged node) position during drag.
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  // Restore the target alpha so the simulation cools after dragging ends.
  // Unfix the subject position now that it’s no longer being dragged.
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  // Specify the color scale.
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // The force simulation mutates links and nodes, so create a copy
  // so that re-evaluating this cell produces the same result.
  const links: any = data.links.map((d) => ({ ...d }));
  const nodes: any = data.nodes.map((d) => ({ ...d }));
  const skills: any = data.skills.map((d) => ({ ...d }));

  // Create a simulation with several forces.
  const simulation = d3
    .forceSimulation([...nodes, ...skills])
    .force(
      "link",
      d3.forceLink(links).id((d: any) => d.id),
    )
    .force("charge", d3.forceManyBody())
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  useEffect(() => {
    if (!skillGraphRef.current || !skillGraphContainerRef || !data) return;
    const width = skillGraphContainerRef.current.clientWidth - 160;
    const height = width;
    const rectWidth = 190;
    const rectHeight = 50;

    // Clear previous chart
    d3.select(skillGraphRef.current).selectAll("*").remove();

    const svg: any = d3
      .select(skillGraphRef.current)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .style("max-width", "100%")
      .style("height", "auto");

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    const node = svg
      .append("g")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 5)
      .attr("fill", (d) => "#5205eb")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended),
      );

    node.append("title").text((d) => d.id);

    const rectGroup = svg
      .append("g")
      .selectAll("g")
      .data(skills)
      .join("g")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended),
      );

    const rect = rectGroup
      .append("rect")
      .attr("width", (d) => d.multiplier * rectWidth)
      .attr("height", (d) => d.multiplier * rectHeight)
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("rx", 8);

    rectGroup
      .append("text")
      .attr("x", (d) => {
        return 85;
      })
      .attr("y", (d) => {
        return 25;
      })
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text((d) => d.name)
      .style("font-size", 23)
      .style("font-weight", 800)
      .style("fill", "black");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      rectGroup.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });
  }, [data, isInView]);

  return (
    <div className="h-[50rem] w-[50rem]">
      <svg ref={skillGraphRef} className="h-full w-full" />
    </div>
  );
};

export default SkillGraph;
