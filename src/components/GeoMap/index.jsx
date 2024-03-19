import { useEffect, useRef, useState } from 'react'
import { select, geoPath, geoMercator } from 'd3'
import useResizeObserver from 'beautiful-react-hooks/useResizeObserver'

import data from '../../assets/data/australia-map.geo.json'

import './styles.css'

function GeoMap() {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const DOMRect = useResizeObserver(wrapperRef)

  const [selectedRegion, setSelectedRegion] = useState({})

  useEffect(() => {
    const svg = select(svgRef.current)

    function handlePathClick(event, feature) {
      if (selectedRegion.STATE_SHORT === feature.properties.STATE_SHORT) {
        setSelectedRegion({})
        select(this).attr('id', '')
      } else {
        setSelectedRegion(feature.properties)
        svg.select('#selected').attr('id', '') // remove previous selected path id
        select(this).attr('id', 'selected')
      }
    }

    const { width, height } =
      DOMRect || wrapperRef.current.getBoundingClientRect()

    const projection = geoMercator()
      .fitSize([width, height], data)
      .precision(100)

    const pathGenerator = geoPath().projection(projection)

    svg
      .selectAll('.states')
      .data(data.features)
      .join('path')
      .attr('class', 'states')
      .attr('d', (feature) => pathGenerator(feature))
      .on('click', handlePathClick)

    // create text element for states
    svg
      .selectAll('text')
      .data(data.features)
      .join('text')
      .attr('fill', '#212B36')
      .attr('transform', (d) => 'translate(' + pathGenerator.centroid(d) + ')')
      .attr('text-anchor', 'middle')
      .attr('x', 0)
      .attr('y', 0)
      .attr('class', 'state-label')
      .text((d) => d.properties.STATE_SHORT)
  }, [selectedRegion, DOMRect])

  return (
    <div className="flex h-full">
      <div ref={wrapperRef} className="w-1/2 h-full">
        <svg ref={svgRef} width={DOMRect?.width} height={DOMRect?.height}></svg>
      </div>
      <div className="flex flex-col w-1/2 gap-10 pr-24 max-w-[500px] justify-center">
        <div className="text-xs">
          <div className="mb-4">
            {selectedRegion.STATE_SHORT ? (
              <span>
                You&apos;ve selected
                <span className="ml-1 font-medium text-gray-darkest">
                  {selectedRegion.STATE_NAME} Regions
                </span>
              </span>
            ) : (
              <span>You&apos;ve not selected a region, yet</span>
            )}
          </div>

          <div className="h-28">
            {selectedRegion.STATE_SHORT ? (
              <>
                <div>This includes the following sub-regions, </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedRegion.SUB_REGIONS.map((region, idx) => (
                    <span key={region.toLowerCase()}>
                      <span className="p-[3px] bg-gray-lightest">{region}</span>
                      {idx === selectedRegion.SUB_REGIONS.length - 1 ? '' : ','}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div>Select a region to see sub-regions -</div>
            )}{' '}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xs text-gray-darkest font-normal">
            Enter Pricing
          </div>

          <div className="flex items-center border border-blue-light rounded-md h-12 focus-within:border-primary  pl-3">
            <span className="text-blue-gray opacity-40">A$</span>
            <input
              type="number"
              className="flex-grow px-2 text-gray-darkest border-none outline-none [appearance:textfield]"
            />
          </div>

          <button className="px-4 py-2 border border-primary rounded-md text-white text-sm font-semibold bg-primary h-12 disabled:opacity-40">
            Save Pricing
          </button>
        </div>
        <div>
          <div className="text-xs text-gray-darkest font-normal">
            No Saved Region Yet
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default GeoMap
