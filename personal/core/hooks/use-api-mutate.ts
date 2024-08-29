import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { axiosInstances, TypeDefaultApiParams } from "@/core";
// import toast from "react-hot-toast";

const toast = {
  success: (message: string) => console.log(message),
  error: (message: string) => console.log(message),
};

type Options<Param, Response> = Omit<
  UseMutationOptions<Response, DefaultError, Param, unknown>,
  "mutationFn" | "mutationKey"
>;

interface ParamsUseApiMutate<Param, Response> extends TypeDefaultApiParams {
  method?: "put" | "post" | "patch" | "delete";
  enableDefaultToast?: boolean;
  options?: Options<Param, Response>;
}

export const useApiMutate = <Param, Response>({
  instance = "main",
  method = "post",
  endpoint,
  paramsSchema,
  responseSchema,
  message,
  enableDefaultToast = true,
  options = {},
}: ParamsUseApiMutate<Param, Response>) => {
  const apiRequest = async (body: Param) => {
    try {
      const response = await axiosInstances[instance][method]<Response>(
        endpoint,
        body
      );
      const data = response?.data;

      if (!responseSchema) {
        message?.success && toast.success(message.success);

        return data;
      }

      const safeData = responseSchema.safeParse(data);

      if (safeData.success) {
        message?.success && toast.success(message.success);

        return safeData.data;
      }

      if (message?.error || enableDefaultToast) {
        toast.error(message?.error || "Houve um erro nos dados recebidos.");
      }
      return data;
    } catch (err) {
      if (message?.error || enableDefaultToast) {
        toast.error(message?.error || "Houve um erro na requisição.");
      }
      return Promise.reject(err);
    }
  };

  const handleMutate = (body: Param): Promise<Response> => {
    if (!paramsSchema) return apiRequest(body);
    const safeParams = paramsSchema.safeParse(body);

    if (safeParams.success) {
      return apiRequest(body);
    }

    if (enableDefaultToast) {
      toast.error("Houve um problema com os dados para realizar a solicitação");
    }

    return Promise.reject({} as Response);
  };

  return useMutation({
    retry: 0,
    mutationFn: handleMutate,
    mutationKey: [`${endpoint}::${method}`],
    ...options,
  });
};

