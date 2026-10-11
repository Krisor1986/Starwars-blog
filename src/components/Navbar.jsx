import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <nav className="navbar bg-light" data-bs-theme="light">
      <div className="container">
        <Link to="/" className="navbar-brand text-dark fw-bold">
          STAR WARS
        </Link>

        <div className="dropdown">
          <button
            className="btn btn-warning dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            Favorites
            <span className="badge bg-dark ms-2">{store.favorites.length}</span>
          </button>

          <ul className="dropdown-menu dropdown-menu-end">
            {store.favorites.length === 0 ? (
              <li>
                <span className="dropdown-item-text">No favorites yet</span>
              </li>
            ) : (
              store.favorites.map((favorite) => (
                <li
                  key={`${favorite.category}-${favorite.uid}`}
                  className="d-flex align-items-center justify-content-between gap-3 px-3 py-2"
                >
                  <Link
                    to={`/details/${favorite.category}/${favorite.uid}`}
                    className="text-decoration-none text-dark"
                  >
                    {favorite.name}
                  </Link>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    type="button"
                    aria-label={`Remove ${favorite.name} from favorites`}
                    onClick={() =>
                      dispatch({
                        type: "toggle_favorite",
                        payload: favorite,
                      })
                    }
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
