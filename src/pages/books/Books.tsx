import React, { useContext, useState } from "react";

import { useApiAllPages } from "../../utils/GetBooks";
import { IAuthContext, AuthContext } from "react-oauth2-code-pkce";

interface Book {
  id: number;
  title: string;
  description: string;
}

const UserInfo = (): JSX.Element => {
  const { token, tokenData } = useContext<IAuthContext>(AuthContext);

  return (
    <>
      <h4>Access Token</h4>
      <pre>{token}</pre>
      <h4>User Information from JWT</h4>
      <pre>{JSON.stringify(tokenData, null, 2)}</pre>
    </>
  );
};

export const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const responseData = useApiAllPages(
    "https://demo.api-platform.com/admin/books?page=1&itemsPerPage=10"
  );

  console.log(responseData);
  return (
    <div>
      {books !== null && (
        <div>
          {/* Wyświetlenie pobranych danych */}
          <h2>Lista książek:</h2>
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
              </li>
            ))}
          </ul>
          <UserInfo />
        </div>
      )}
    </div>
  );
};
