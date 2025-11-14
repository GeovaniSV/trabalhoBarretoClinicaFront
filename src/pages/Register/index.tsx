import React, { useRef, useState, type ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../services/api";
import "./Register.css";

import InputField from "../../components/ui/InputField";
import ButtonField from "../../components/ui/ButtonField";

function Register() {
  const [inputValues, setInputValues] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "P",
    telefone: "",
    cep: "",
    especialidade: "",
  });

  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async () => {
    try {
      await api.post("/auth/register", {
        nome: inputValues.nome,
        email: inputValues.email,
        senha: inputValues.senha,
      });
      navigate("/login");
    } catch (e) {
      console.log(e);
      alert("Dados incorretos");
    }
  };
  console.log(inputValues.tipo);

  const handleKeySubmit = (e: React.KeyboardEvent) => {
    const { code } = e;

    if (["Enter", "NumpadEnter"].includes(code)) {
      handleSubmit();
    }
  };

  return (
    <main className="background w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-2/4 p-4 rounded-lg  max-[420px]:px-1 border-gray-300 border shadow-xl">
        <div className="grid text-center">
          <span className="font-bold text-2xl">Cadastro</span>
          <span className="mt-5">
            Preencha os campos abaixo para realizar o cadastro
          </span>
        </div>

        <div className="grid grid-cols-3">
          <InputField
            label="Nome"
            placeholder="Digite seu nome"
            value={inputValues.nome}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValues({ ...inputValues, nome: e.target.value })
            }
            onKeyDown={handleKeySubmit}
          />

          <InputField
            label="E-mail"
            placeholder="Digite seu email"
            className="mt-5"
            value={inputValues.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValues({ ...inputValues, email: e.target.value })
            }
            onKeyDown={handleKeySubmit}
          />

          <InputField
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            className="mt-5"
            value={inputValues.senha}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValues({ ...inputValues, senha: e.target.value })
            }
            onKeyDown={(e: React.KeyboardEvent) => handleKeySubmit(e)}
          />

          <select
            className="bg-gray-100 w-full mt-5 p-2"
            value={inputValues.tipo}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setInputValues({ ...inputValues, tipo: e.target.value })
            }
          >
            <option value="P">Paciente</option>
            <option value="M">Médico</option>
          </select>

          {inputValues.tipo == "P" || inputValues.tipo == "M" ? (
            <InputField
              type="text"
              label="Telefone"
              placeholder="(66) 9 9999-9999"
              className="mt-5"
              value={inputValues.senha}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputValues({ ...inputValues, senha: e.target.value })
              }
              onKeyDown={(e: React.KeyboardEvent) => handleKeySubmit(e)}
            />
          ) : null}

          <ButtonField
            ref={buttonRef}
            title="ENTRAR"
            className="mt-8"
            onClick={handleSubmit}
          />
        </div>

        <div className="mt-5">
          <Link
            to="/login"
            className="text-blueCS font-bold cursor-pointer hover:text-blue-500"
          >
            Já possui uma conta? <span className="underline">Entre aqui!</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Register;
