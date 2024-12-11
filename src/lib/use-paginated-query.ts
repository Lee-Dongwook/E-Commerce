import { OperationContext, RequestPolicy } from "@urql/next";
import React, { useRef } from "react";
import { useQuery } from "urql";

export function usePaginatedQuery<Data = any, Variables = object>(args) {
  const [query, queryFn] = useQuery(args);

  const { data, ...rest } = query;

  const mergeRef = useRef({ current: data, last: data });

  if (
    data &&
    mergeRef.current.current &&
    query.data !== mergeRef.current.last
  ) {
    mergeRef.current.current = args.mergeResults(
      mergeRef.current.current,
      data,
    );
  }

  if (data != null && mergeRef.current.current == null) {
    mergeRef.current.current = data;
  }

  mergeRef.current.last = query.data;

  return [
    {
      ...rest,
      data: mergeRef.current.current,
    },
    queryFn,
  ];
}
