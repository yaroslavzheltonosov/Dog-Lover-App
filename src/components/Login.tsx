import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useLogin from "../services/useLogin";

import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const history = useNavigate();

  const request = useLogin({ email, name });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name && !email) return;
    request.handleSubmit();
  };

  if (request.isSuccessful) {
    history("/home");
  }

  return (
    <div className={styles.FormContainer}>
      <form onSubmit={handleSubmit} className={styles.Form}>
        <h1 className={styles.Login}>Login</h1>
        <div className={styles.EmailFieldContainer}>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            autoComplete="email"
            className={styles.EmailField}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input
          type="text"
          placeholder="Enter your Name"
          value={name}
          autoComplete="given-name"
          className={styles.NameField}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className={styles.SubmitFormButton} disabled={request.isLoading}>
          {request.isLoading ? 'Logging in...' : 'Login'}
        </button>
        {request.error && (
          <div className={styles.ErrorMessage}>{request.error}</div>
        )}
      </form>
    </div>
  );
};

export default Login;
