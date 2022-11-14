import { Button, Input, Notification } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/auth-context';

import { useForm } from '../../hooks/use-form';
import { AuthUser } from '../../interfaces/auth';
import styles from './styles.module.css';

const Login = () => {
    const { values, onChange } = useForm({ email: 'test@gmail.com', password: '12345678' });
    const { setIsAuth } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        return fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: values.email, password: values.password }),
        }).then((response) => response.json());
    };

    const { mutate, isLoading } = useMutation<AuthUser>(handleSubmit, {
        onSuccess: (data) => {
            if (Number.isInteger(data.id)) {
                setIsAuth(true);
                return navigate('/chat', { replace: true });
            }
        },
    });

    const handleAuthClick = () => mutate();

    return (
        <div className={styles.container}>
            <Input.Wrapper className={styles.input_container} data-testid="email-input" label="Email" required>
                <Input name="email" value={values.email} onChange={onChange} />
            </Input.Wrapper>
            <Input.Wrapper className={styles.input_container} data-testid="email-input" label="Password" required>
                <Input name="password" value={values.password} onChange={onChange} />
            </Input.Wrapper>
            <Button onClick={handleAuthClick} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                auth me
            </Button>

            {isLoading && (
                <Notification
                    className={styles.notification_container}
                    loading={isLoading}
                    title="Server is getting your request"
                    disallowClose
                >
                    Auth process in progress...
                </Notification>
            )}
        </div>
    );
};

export default Login;
