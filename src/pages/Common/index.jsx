function CommonPage() {
  return (
    <div className="flex flex-col h-full p-6 gap-6 text-blue-gray bg-white rounded-[7px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-darkest">Page Header</h2>
          <div className="text-base font-normal">
            Page description goes here
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommonPage
