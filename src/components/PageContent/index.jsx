import GeoMap from '../GeoMap'

function PageContent() {
  return (
    <div
      className={`lg:ml-[var(--sidebar-width)] p-6 h-[calc(100%-var(--header-height))]`}
    >
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
            <button className=" px-4 py-2 border border-gray-border rounded-md text-gray-darkest text-[15px] font-semibold w-[120px] h-12 disabled:opacity-40">
              Cancel
            </button>
            <button className="px-4 py-2 border border-primary rounded-md text-white text-sm font-semibold bg-primary w-[120px] h-12 disabled:opacity-40">
              Save
            </button>
          </div>
        </div>
        <GeoMap />
      </div>
    </div>
  )
}

export default PageContent
