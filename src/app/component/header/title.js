function TitleHeader() {
  return (
    <>
      <div className="relative">
        {/* Checkbox làm peer */}
        <input type="checkbox" id="toggle" className="peer hidden" />

        {/* Div được điều khiển */}
        <div className="peer-checked:opacity-0 focus-within: peer-checked:h-0 peer-checked:overflow-hidden bg-teal-400 flex h-12 items-center peer-checked:p-0 p-4 text-center transition-all duration-500 ease-in-out">
          <h2 className="flex-grow">
            Free Shipping on U.S. orders $50+. Free Returns. International
            Shipping!
          </h2>
          <label
            htmlFor="toggle"
            className="text-red-500 cursor-pointer ml-auto"
          >
            X
          </label>
        </div>
      </div>
    </>
  );
}

export default TitleHeader;
