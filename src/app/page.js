export default function Home() {
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-3"> {/* 3x3 Grid container that handles 9 grid items */}

            <div className="col-span-1"> {/* Grid child element, css equivalent to grid-column: span 1; */}
              <div className="row-span-1"> {/* Grid child element, css equivalent to grid-row: span 1; */}
                <div className=" grid">
                <h1 className="text-center text-lg pt-4">Home Page</h1>
                </div>
              </div>
            </div>
      </div>
    </>
  );
}

// fr - fraction unit. grid-template-columns: 2fr 1fr; would create 2 columns in your grid, with the 1st col taking up 66%
// of its parents width, and the 2nd column's width being the remaining third.

// when defining your grid columns, you can use a repeat. let's say you wanted 4 columns and each being 100px wide. 
// instead of writing grid-template-columns: 100px 100px 100px 100px; you can do grid-template-columns: repeat(4, 100px); 

// if you don't know how large your grid is going to be, so you don't know how many columns or rows you need, you can use:
// grid-auto-rows: 100px; and grid-auto-cols: 100px; 
// this will determine the size of all rows and cols that get added after our template rows and template cols

// use minmax() to establish the minimum size and maximum size of a grid item.
// grid-auto-rows: minmax(150px, auto); will set all rows to a minimum size of 150px and
// the max size will automatically scale with the content inside the row item

//      <div className="grid"> {/* Grid container, css equivalent to display: grid */}
//      <div className="grid-cols-1"> {/*css equivalent to grid-template-columns: repeat(1, minmax(0, 1fr)); */}
//      <div className="grid-rows-1"> {/*css equivalent to grid-template-rows: repeat(1, minmax(0, 1fr)); */}
//        <div className="col-span-1"> {/* Grid child element, css equivalent to grid-column: span 1; */}
//          <div className="row-span-1"> {/* Grid child element, css equivalent to grid-row: span 1; */}
//            <h1 className="text-center text-lg pt-4">Home Page</h1>
//          </div>
//        </div>
//      </div>
//    </div>
//  </div>
