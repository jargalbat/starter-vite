// import React from "react";
// import { useLogout, useGetIdentity } from "@refinedev/core";

// // Define the shape of the identity object
// interface Identity {
//     name: string;
//     // Add any other properties you expect in the identity object
// }

// export const Header = () => {
//     const { mutate, isLoading } = useLogout();
//     const { data: identity } = useGetIdentity<Identity>();

//     return (
//         <>
//             <h2>
//                 <span>Welcome!</span>
//                 <span>{identity?.name ?? ""}</span>
//             </h2>
//             <button
//                 type="button"
//                 disabled={isLoading}
//                 onClick={() => mutate()}
//             >
//                 {isLoading ? "Logging out..." : "Logout"}
//             </button>
//         </>
//     );
// };

import React from "react";
import { useLogout, useGetIdentity } from "@refinedev/core";

export const Header = () => {
  const { mutate, isLoading } = useLogout();
  const { data: identity } = useGetIdentity();

  return (
    <>
      <h2>
        <span>Welcome, </span>
        <span>{identity?.name ?? ""}</span>
      </h2>
      <button type="button" disabled={isLoading} onClick={mutate}>
        Logout
      </button>
    </>
  );
};
