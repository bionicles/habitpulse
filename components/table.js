const DateGroup = () => (
  <>
    <th class="px-4 py-2">20</th>
    <th class="px-4 py-2">21</th>
    <th class="px-4 py-2">22</th>
    <th class="px-4 py-2">23</th>
    <th class="px-4 py-2">24</th>
    <th class="px-4 py-2">25</th>
    <th class="px-4 py-2">26</th>
  </>
);

export const Table = () => (
  <table class="table-auto">
    <thead>
      <tr>
        <th class="px-4 py-2">Habit</th>
        <DateGroup />
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="box namebox">walk</td>
        <td class="box checkbox hover:bg-green-500"></td>
        <td class="box checkbox hover:bg-green-500"></td>
        <td class="box checkbox hover:bg-green-500"></td>
        <td class="box checkbox hover:bg-green-500"></td>
        <td class="box checkbox hover:bg-green-500"></td>
        <td class="box checkbox hover:bg-green-500"></td>
        <td class="box checkbox hover:bg-green-500"></td>
      </tr>
      <tr class="bg-gray-100">
        <td class="box namebox">run</td>
        <td class="box checkbox hover:bg-green-500"></td>
        <td class="box checkbox hover:bg-green-500"></td>
        <td class="box checkbox hover:bg-green-500"></td>
        <td class="box checkbox hover:bg-green-500"></td>
        <td class="box checkbox hover:bg-green-500"></td>
        <td class="box checkbox hover:bg-green-500"></td>
        <td class="box checkbox hover:bg-green-500"></td>
      </tr>
      <tr>
        <td class="box namebox">climb</td>
        <td class="box checkbox hover:bg-green-500"></td>
        <td class="box checkbox hover:bg-green-500"></td>
        <td class="box checkbox hover:bg-green-500"></td>
        <td class="box checkbox hover:bg-green-500"></td>
        <td class="box checkbox hover:bg-green-500"></td>
        <td class="box checkbox hover:bg-green-500"></td>
        <td class="box checkbox hover:bg-green-500"></td>
      </tr>
    </tbody>
  </table>
);

export default Table;
