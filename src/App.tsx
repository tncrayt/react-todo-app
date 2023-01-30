import { FormEvent, useEffect, useRef, useState } from "react"


function App() {

  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState([]);
  const [text, setText] = useState("");
  const [check, setCheck] = useState(false);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([{
    colorCode: "gold",
    text: "Personel"
  },
  {
    colorCode: "orange",
    text: "Work"
  },
  {
    colorCode: "royalblue",
    text: "Freelancer"
  }]);

  useEffect(() => {
    setFilters(todos)
  }, [todos])

  const inputRef = useRef<HTMLInputElement>(null)

  const todoComplede = (i: String) => {


    const item = todos[i];
    const newItem = { ...item, compleded: true }
    const old = [...todos];
    old[i] = newItem

    setTodos(old)


  }

  const handleSubmit = (event: FormEvent) => {

    event.preventDefault()

    setTodos(todos => [...todos, {
      color: tag || "gold",
      text: text,
      compleded: false
    }])

    setText("")
  }

  const handleClickTag = (e: MouseEvent) => {
    setTag(e.target.style.backgroundColor)

    document.body.style.backgroundColor = e.target.style.backgroundColor
    inputRef.current?.focus()
  }

  const handleInputValue = (e: InputEvent) => {
    setText(e.target.value)
  }

  const handleFilterClick = (color: String) => {

    setFilters(todos.filter(item => item.color === color))
  }

  const handleCheckBoxFilter = () => {

    setCheck(!check)

    setFilters(filters.filter(item => item.compleded == false))

  }

  const handleReset = () => {
    setFilters(todos)
    setCheck(false)
  }

  return (
    <>

      <div className="container rounded-md p-3 md:w-4/6 w-full  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white  mx-auto">

        <div className="flex">

          <div className="md:flex w-2/6 flex-col items-start hidden">

            <div className="flex items-center gap-2">
              <div>
                <img src="avatar.svg" width={50} height={50} className="rounded-md" alt="" />
              </div>
              <div>
                <h1 className="font-bold">Todo App</h1>
                <span>Aytuğ Tuncer</span>
              </div>
            </div>

            <hr className="border-t-2 mt-3 h-2 w-3/4 mx-auto" />

            <div className="font-bold text-gray-700 mt-4 mb-3">Tags</div>

            <div className="flex flex-col gap-3">

              {
                tags?.map((item, i) => {
                  return (
                    <div key={i} className="flex items-center cursor-pointer hover:bg-slate-300 duration-200 py-2" onClick={() => handleFilterClick(item.colorCode)}>
                      <div className="w-5 h-5  rounded-full mr-2" style={{ backgroundColor: item.colorCode }}></div>
                      <span>{item.text}</span>
                    </div>
                  )
                })
              }


            </div>

            <div className="font-bold text-gray-700 mt-4 mb-3">Filter</div>

            <div className="flex items-center gap-2">
              <input type="checkbox" checked={check} onChange={handleCheckBoxFilter} className="w-4 h-4" id="filter" />
              <label htmlFor="filter">Hide Done Tasks</label>
            </div>

            <div className="font-bold text-gray-700 mt-4 mb-3">Reset</div>

            <button onClick={handleReset} className="border bg-red-700 rounded-md text-white px-2 py-1 w-3/4 hover:bg-white hover:text-red-700 duration-200">Reset</button>

          </div>

          <div className="w-full bg-[#ca8bfe] md:rounded-r-md  md:py-5 py-2 md:px-10 px-5">

            <div>
              <h1 className="font-bold  text-white">Today Quotes</h1>
              <p>Learn from yesterday, live for today, hope for tomorrow.</p>
            </div>

            <div className="flex flex-col">


              <div className="flex items-center bg-white p-2 rounded-md mt-5 mb-7">
                <form onSubmit={handleSubmit} className="flex items-center">
                  <div className="flex gap-1">
                    {
                      tags?.map((item, i) => {
                        return (
                          <span className="w-3 h-3 rounded-full" onClick={handleClickTag} key={i} style={{ backgroundColor: `${item.colorCode}` }}></span>
                        )
                      })
                    }
                  </div>
                  <input type="text" className="w-full mx-2 focus:outline-none" ref={inputRef} value={text} onChange={handleInputValue} placeholder="Whats your new task?" />
                </form>
              </div>

              <div className="flex flex-col gap-5 h-[320px] overflow-y-auto py-2">


                {
                  filters.map((item, i) => {
                    return (
                      <div key={i} className="flex items-center justify-between rounded-md p-2 bg-white">
                        <div className="flex items-center justify-between">
                          <span className="w-5 h-5 block rounded-full mr-4" style={{ backgroundColor: item.color }}></span>
                          <p>{item.text}</p>
                        </div>
                        {
                          !filters[i].compleded ? <span className="w-5 h-5 rounded-full border-2 cursor-pointer" onClick={() => todoComplede(i)}></span>
                            : <span className="w-5 h-5 rounded-full border-2 bg-green-500 cursor-pointer" onClick={() => todos[i].compleded = true}></span>

                        }
                      </div>
                    )
                  })
                }



              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
