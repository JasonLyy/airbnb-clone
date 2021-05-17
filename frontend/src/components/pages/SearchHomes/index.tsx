import React from "react";
import { useMyTestQueryQuery } from "./__generated__/queries.generated";

const SearchHomes: React.FC = () => {
  const { isLoading, data } = useMyTestQueryQuery();

  return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        data?.listings.edges.map((listing) => (
          <div key={listing?.node.id}>{listing?.node.name}</div>
        ))
      )}
    </div>
  );
};

export default SearchHomes;
