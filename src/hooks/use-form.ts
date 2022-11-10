import { ChangeEvent, useCallback, useState } from 'react';

export const useForm = <T>(initialValues: T) => {
    const [values, setValues] = useState<typeof initialValues>(initialValues);

    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [e.target.name]: e.target.value });
        },
        [values]
    );

    return { values, onChange };
};
