import { useEffect, useState, type ChangeEvent } from "react";
import { api } from "../../services/api";
import ButtonField from "../../components/ui/ButtonField";
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify'
import { Bounce } from "react-toastify/unstyled";
import { AxiosError } from "axios";

interface IMedico {
  id: number;
  nome: string;
  telefone: string;
  cep: string;
  especialidade: string;
}

interface IPaciente {
  id: number;
  nome: string;
  telefone: string;
  cep: string;
}

interface IPlanoDeSaude {
  id: number;
  nome: string;
  cobertura: number;
}

interface IProcedimento {
  id: number;
  nome: string;
}

function Agendamentos() {
const navigate = useNavigate()
  const [doctors, setDoctors] = useState<IMedico[]>([]);
  const [pacientes, setPacientes] = useState<IPaciente[]>([]);
  const [procedimento, setProcedimento] = useState<IProcedimento[]>([]);
  const [planoDeSaude, setPlanoDeSaude] = useState<IPlanoDeSaude[]>([]);

  const[inputValues, setInputValues] = useState({
    medicoId: '',
    pacienteId: '',
    procedimentoId:'',
    planoDeSaudeId: ''
  })

  const getDoctors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/medicos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctors(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  
  const getPacientes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/pacientes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPacientes(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getPlanos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/planos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlanoDeSaude(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getProcedimentos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/procedimentos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProcedimento(response.data);
    } catch (e) {
      console.log(e);
    }
  };


    const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token')
      await api.post("/agendamentos", {
        medicoId: Number(inputValues.medicoId),
        pacienteId: Number(inputValues.pacienteId),
        procedimentoId: Number(inputValues.procedimentoId), 
        planoDeSaudeId: Number(inputValues.planoDeSaudeId)
      }, {headers:{Authorization:`Bearer ${token} ` } });
      navigate("/home");
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        const errorMap: Record<number, VoidFunction> = {
          400: () => {
            toast("Dados incorretos ou não preenchidos", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          },
        };

        return errorMap[e.status!]();
      }
    }
  };

    useEffect(() => {
      getDoctors();
      getPacientes()
      getPlanos()
      getProcedimentos()

    },[]);
 
  return (
    <main className="w-screen h-screen flex justify-center p-2">
      <ToastContainer/>
      <div className="w-full">
        <h1 className="text-4xl font-bold">Agendamentos</h1>
        <div className="grid grid-cols-3 gap-3 mt-5 mx-auto w-3/4">
          <div className="flex flex-col">
            <label htmlFor="medico">Médico</label>
            <select 
            className="border-b-2 p-2 bg-gray-300 rounded-lg" 
            name="medico" 
            id="med"  
            value={inputValues.medicoId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>setInputValues({ ...inputValues, medicoId: e.target.value })}
            >
              <option value=""> </option>
              {doctors.map((doc)=> (
              
                <option value={doc.id} key={doc.id}>{doc.nome}</option>
               
              ) )}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="paciente">Paciente</label>
            <select className="border-b-2 p-2 bg-gray-300 rounded-lg" name="paciente" id="pac" value={inputValues.pacienteId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>setInputValues({ ...inputValues, pacienteId: e.target.value })}>
              <option value=""> </option>
              {pacientes.map((paciente)=> (
               
                <option value={paciente.id} key={paciente.id}>{paciente.nome}</option>
              
              ) )}
            </select>
          </div>
 
          <div className="flex flex-col">
            <label htmlFor="procedimento">Procedimentos</label>
            <select className="border-b-2 p-2 bg-gray-300 rounded-lg" name="procedimento" id="proc" value={inputValues.procedimentoId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>setInputValues({ ...inputValues, procedimentoId: e.target.value })}>
              <option value=""> </option>
              {procedimento.map((procedimento)=> (
               
                <option value={procedimento.id} key={procedimento.id}>{procedimento.nome}</option>
               
              ) )}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="plano">Plano de Saúde</label>
            <select className="border-b-2 p-2 bg-gray-300 rounded-lg" name="plano" id="plano" value={inputValues.planoDeSaudeId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>setInputValues({ ...inputValues, planoDeSaudeId: e.target.value })}>
              <option value=""> </option>
              {planoDeSaude.map((plano)=> (
               
                <option value={plano.id} key={plano.id}>{plano.nome}</option>
                
              ) )}
            </select>
          </div>

          <ButtonField title="Agendar" className="col-span-3" onClick={handleSubmit}/>

        </div>
      </div>
    </main>
  );
}

export default Agendamentos;
