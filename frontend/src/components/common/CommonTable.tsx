import '../css/Layout.css'

const CommonTable = ({ columns, data, actions }: any) => {
  return (
    <div className="table-container">
      <table className="common-table">
        <thead>
          <tr>
            {columns.map((col: any) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {actions?.length > 0 && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row: any, index: number) => (
              <tr key={row.id || index}>
                {columns.map((col: any) => (
                  <td key={col.key}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}

                {actions?.length > 0 && (
                  <td className="action-cell">
                    {actions.map((action: any) => {
                      if (action.show && !action.show(row)) return null;

                      return (
                        <button
                          key={action.key}
                          className={`action-btn ${action.className || ""}`}
                          onClick={() => action.onClick(row)}
                          title={action.label}
                        >
                            {action.icon && (
                                <img
                                    src={action.icon}
                                    alt={action.alt || action.label}
                                    className="action-icon"
                                />
                            )}
                        </button>
                      );
                    })}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="no-data">
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;