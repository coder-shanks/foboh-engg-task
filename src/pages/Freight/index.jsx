import { useEffect, useRef, useState } from 'react'
import { select, geoPath, geoMercator } from 'd3'
import useResizeObserver from 'beautiful-react-hooks/useResizeObserver'
import { DeleteIcon, EditIcon } from '../../components/Icons'

import data from '../../assets/data/australia-map.geo.json'

import './styles.css'

function FreightPage() {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const DOMRect = useResizeObserver(wrapperRef)

  const [selectedRegion, setSelectedRegion] = useState({})
  const [savedRegions, setSavedRegions] = useState([])
  const [pricingVal, setPricingVal] = useState('')

  const areActionsEnabled = selectedRegion.STATE_SHORT?.length > 0

  function handleSavePricing() {
    const svg = select(svgRef.current)
    svg.select('#selected').attr('id', null).classed('saved', true)
    svg.select(`text#${selectedRegion.STATE_SHORT}`).classed('saved', true)

    setSavedRegions([
      ...savedRegions,
      { PRICING: pricingVal, ...selectedRegion }
    ])

    // svg.selectAll('.saved').style('pointer-events', 'none')
    setPricingVal('')
  }

  function handleDeleteSavedRegion(region) {
    const svg = select(svgRef.current)
    svg.select('path.saved').classed('saved', false)
    svg.select(`text#${selectedRegion.STATE_SHORT}`).classed('saved', false)

    setSavedRegions(
      savedRegions.filter((sr) => sr.STATE_SHORT !== region.STATE_SHORT)
    )
  }

  useEffect(() => {
    const svg = select(svgRef.current)

    function handlePathClick(event, feature) {
      const stateShortName = feature.properties.STATE_SHORT
      if (selectedRegion.STATE_SHORT === stateShortName) {
        setSelectedRegion({})
        select(this).attr('id', null)
      } else {
        setSelectedRegion(feature.properties)
        svg.select('#selected').attr('id', null) // remove previous selected path id
        select(this).attr('id', 'selected')
      }
    }

    const { width, height } =
      DOMRect || wrapperRef.current.getBoundingClientRect()

    const projection = geoMercator()
      .fitSize([width, height], data)
      .precision(100)

    const pathGenerator = geoPath().projection(projection)

    // const unsavedRegions = data.features.filter(
    //   (feature) =>
    //     feature.properties.STATE_SHORT !== savedRegions?.[0]?.STATE_SHORT
    // )
    // console.log(unsavedRegions)
    svg
      .selectAll('.states')
      .data(data.features)
      .join('path')
      .attr('class', 'states')
      .attr('d', (feature) => pathGenerator(feature))
      .on('click', handlePathClick)

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
      .attr('id', (d) => d.properties.STATE_SHORT)
  }, [selectedRegion, DOMRect])

  return (
    <div className="flex flex-col h-full p-6 gap-6 text-blue-gray bg-white rounded-[7px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-darkest">
            Freight Management
          </h2>
          <div className="text-base font-normal">
            Select freight zones and assign shipping prices
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className="px-4 py-2 border border-gray-border rounded-md text-gray-darkest text-[15px] font-semibold w-[120px] h-12 disabled:opacity-40"
            disabled={!areActionsEnabled}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 border border-primary rounded-md text-white text-sm font-semibold bg-primary w-[120px] h-12 disabled:opacity-40"
            disabled={!areActionsEnabled}
          >
            Save
          </button>
        </div>
      </div>
      <div className="flex flex-col h-full lg:flex-row">
        <div ref={wrapperRef} className="w-full lg:w-1/2 lg:h-full">
          <svg
            ref={svgRef}
            width={DOMRect?.width}
            height={DOMRect?.height}
          ></svg>
        </div>
        <div className="flex flex-col w-full lg:w-1/2 gap-10 pr-24 lg:max-w-[500px] justify-center">
          <div className="text-xs">
            <div className="mb-4">
              {selectedRegion.STATE_SHORT ? (
                <span>
                  You&apos;ve selected
                  <span className="ml-1 font-medium text-gray-darkest">
                    {selectedRegion.STATE_NAME} Regions
                  </span>
                  <span className="ml-2 font-medium text-primary">Change</span>
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
                        <span className="p-[3px] bg-gray-lightest">
                          {region}
                        </span>
                        {idx === selectedRegion.SUB_REGIONS.length - 1
                          ? ''
                          : ','}
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
            <div className="text-xs font-normal text-gray-darkest">
              Enter Pricing
            </div>

            <div className="flex items-center h-12 pl-3 border rounded-md border-blue-light focus-within:border-primary">
              <span className="text-blue-gray opacity-40">A$</span>
              <input
                type="number"
                value={pricingVal}
                onChange={(e) => setPricingVal(e.target.value)}
                className="flex-grow px-2 text-gray-darkest bg-transparent border-none outline-none [appearance:textfield]"
                disabled={!areActionsEnabled}
              />
            </div>

            <button
              className="h-12 px-4 py-2 text-sm font-semibold text-white border rounded-md border-primary bg-primary disabled:opacity-40"
              onClick={handleSavePricing}
              disabled={!areActionsEnabled}
            >
              Save Pricing
            </button>
          </div>

          {savedRegions.length > 0 ? (
            <div>
              <div className="mb-2 text-xs font-normal blue-gray">
                Saved Region
              </div>
              {savedRegions.map((region) => (
                <div
                  key={`saved-${region.STATE_SHORT}`}
                  className="flex items-center"
                >
                  <div className="flex flex-col">
                    <div className="text-xs font-medium text-gray-darkest">
                      {region.STATE_NAME}
                    </div>
                    <div className="text-xs">A$ {region.PRICING}</div>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <span className="p-2 border rounded-full cursor-pointer border-gray-lightest hover:bg-slate-100">
                      <EditIcon />
                    </span>
                    <span
                      className="p-2 border rounded-full cursor-pointer border-gray-lightest hover:bg-slate-100"
                      onClick={() => handleDeleteSavedRegion(region)}
                    >
                      <DeleteIcon />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs font-normal text-gray-darkest">
              No Saved Region Yet
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FreightPage
