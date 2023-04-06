import { MutationFunction, useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useAuthUser = <T>(mutationFn: MutationFunction<T, void>, options?: Omit<UseMutationOptions<T, unknown, void, unknown>, "mutationFn"> | undefined) => {
    const { mutate, isLoading } = useMutation<T>(mutationFn, options);
    return { mutate, isLoading }
}