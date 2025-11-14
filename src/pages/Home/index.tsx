import { useEffect, useState } from "react";
import { api } from "../../services/api";

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

interface IConsulta {
  id: number;
  dia: string; // ou Date se você preferir trabalhar com objetos Date
  medico: IMedico;
  paciente: IPaciente;
  planoDeSaude: IPlanoDeSaude;
  procedimento: IProcedimento;
}



function Home() {
  const [doctors, setDoctors] = useState<IMedico[]>([]);
  const [pacientes, setPacientes] = useState<IPaciente[]>([]);
  const [agendamentos, setAgendamentos] = useState<IConsulta[]>([]);

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

const getAgendamentos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/agendamentos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAgendamentos(response.data)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDoctors();
    getPacientes()
    getAgendamentos()
  },[]);

  return (
    <main className="w-screen h-screen flex justify-center">
      <div className="grid grid-cols-2 h-full w-full p-5 gap-2 grid-rows-2">
        <div className="border border-gray-400 rounded-sm shadow-lg overflow-auto">
          <h1 className="text-center">Médicos</h1>
          {doctors.map((med) => (
            <div className="border-t border-gray-400 p-2" key={med.id}>
              <h1><strong>Nome: </strong>{med.nome} </h1>
              <p><strong>Especialidade: </strong>{med.especialidade}</p>
              <p><strong>Telefone: </strong>{med.telefone} </p>
            </div>
          ))}
        </div>

         <div className="border border-gray-400 rounded-sm shadow-lg overflow-auto">
          <h1 className="text-center">Pacientes</h1>
          {pacientes.map((pac) => (
            <div className="border-t border-gray-400 p-2" key={pac.id}>
              <h1><strong>Nome: </strong>{pac.nome} </h1>
              <p><strong>Telefone: </strong>{pac.telefone} </p>
            </div>
          ))}
        </div>

        <div className="border border-gray-400 rounded-sm shadow-lg overflow-auto col-span-2">
          <h1 className="text-center">Consultas</h1>
          {agendamentos.map((agenda) => (
            <div className="border-t border-gray-400 p-2" key={agenda.id}>
              <h1><strong>Especialidade:</strong> {agenda.medico.especialidade} </h1>
              <p><strong>Medico: </strong>{agenda.medico.nome} </p>
              <p><strong>Paciente:</strong> {agenda.paciente.nome} </p>
              <p><strong>Procedimento: </strong>{agenda.procedimento.nome}</p>
              <p><strong>Plano de Saúde: </strong>{agenda.planoDeSaude.nome}</p>
              <p><strong>Plano de Saúde Cobertura:</strong> {agenda.planoDeSaude.cobertura}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
