export default function TableSkeleton() {
  return (
    <table className="flex flex-col items-center">
      <thead>
        <tr>
          <th className="pt-2 text-2xl">Loading table</th>
        </tr>
      </thead>
      <tbody>
        < tr className="border-4 border-double bg-cyan-100" >
          <td colSpan="3" className="text-center text-gray-400">
            <div className="flex items-center">
              Loading...
              <button className="border-2 ml-2 p-1">spinner</button>
            </div>
          </td>
        </tr >
      </tbody>
    </table>
  )
}