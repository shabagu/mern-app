import { useCallback, useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import { Loader } from '../../components/common/Loader'

import { SelectionPhase } from '../../components/newResearch/phases/SelectionPhase'
import { CriteriaRating } from '../../components/newResearch/phases/CriteriaRating'
import { CriteriaWeights } from '../../components/newResearch/phases/CriteriaWeights'
import { AlternativesRating } from '../../components/newResearch/phases/AlternativesRating'
import { AlternativesWeights } from '../../components/newResearch/phases/AlternativesWeights'
import { GroupsWeights } from '../../components/newResearch/phases/GroupsWeights'
import { GlobalWeights } from '../../components/newResearch/phases/GlobalWeights'
import { PhaseTitle } from '../../components/newResearch/PhaseTitle'
import { PhasesSidebar } from '../../components/newResearch/PhasesSidebar'

import style from './NewResearchPage.module.scss'



export const DEFAULT_BUTTON_COLOR = '#26a69a'
export const HOT_CHANGES_BUTTON_COLOR = '#ff8e3a'

export const HOT_CHANGES_HANDLER = (HOT_CHANGES_BUTTON_COLOR) => {
  const NEXT_PHASE_TITLE_BUTTON = document.querySelector('.NEXT_PHASE_TITLE_BUTTON')
  NEXT_PHASE_TITLE_BUTTON.style.backgroundColor = HOT_CHANGES_BUTTON_COLOR
}


const NEXT_PHASE_TITLE_BUTTON_DEFAULT_COLOR = '#26a69a'
const NEXT_PHASE_TITLE_BUTTON_HOT_CHANGES_COLOR = '#ff8e3a'

export const HOT_CHANGES_EFFECT = () => {
  const button = document.querySelector('.NEXT_PHASE_TITLE_BUTTON')
  button.style.backgroundColor = NEXT_PHASE_TITLE_BUTTON_HOT_CHANGES_COLOR
} 
export const HOT_CHANGES_EFFECT_RESET = () => {
  const button = document.querySelector('.NEXT_PHASE_TITLE_BUTTON')
  button.style.backgroundColor = NEXT_PHASE_TITLE_BUTTON_DEFAULT_COLOR
} 



export const NewResearchPage = () => {

  const [phase, setPhase] = useState(0)
  const [phasesDone, setPhasesDone] = useState(0)

  const [criteria, setCriteria] = useState([])
  const [criteriaMTX, setCriteriaMTX] = useState([])
  const [criteriaSum, setCriteriaSum] = useState([])
  const [criteriaNormMTX, setCriteriaNormMTX] = useState([])
  const [criteriaWeights, setCriteriaWeights] = useState([])
  
  const [alternatives, setAlternatives] = useState([])
  const [alternativesMTX, setAlternativesMTX] = useState([])
  const [alternativesSum, setAlternativesSum] = useState([])
  const [alternativesNormMTX, setAlternativesNormMTX] = useState([])
  const [alternativesWeights, setAlternativesWeights] = useState([])
  const [globalWeights, setGlobalWeights] = useState([])

  const [allCriteria, setAllCriteria] = useState([])
  const [allAlternatives, setAllAlternatives] = useState([])

  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const history = useHistory()
  const auth = useContext(AuthContext)
  const message = useMessage()

  const logoutHandler = () => {
    auth.logout()
    history.push('/')
  }

  const fetchAllCriteria = useCallback( async () => {
    try {
      const fetched = await request('/api/research/criteria', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setAllCriteria(fetched)
    } catch (e) {
      message(e.message)
      setTimeout(logoutHandler, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, request])

  const fetchAllAlternatives = useCallback( async () => {
    try {
      const fetched = await request('/api/research/alternatives', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setAllAlternatives(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchAllCriteria()
    fetchAllAlternatives()
  }, [fetchAllCriteria, fetchAllAlternatives])

  const nextPhaseHandler = (skip) => {
    if (phase < 6) {
      setPhase(phase + skip)
    }
  }
  const previousPhaseHandler = (skip) => {
    if (phase > 0) {
      setPhase(phase - skip)
    }
  }
  const goToPhaseHandler = (phase) => { setPhase(phase) }
  const phasesDoneHandler = (phase) => { setPhasesDone(phase) }

  const setCriteriaHandler = (array) => { setCriteria(array) }
  const setCriteriaMTXHandler = (mtx) => { setCriteriaMTX(mtx) }
  const setCriteriaSumHandler = (array) => { setCriteriaSum(array) }
  const setCriteriaNormMTXHandler = (mtx) => { setCriteriaNormMTX(mtx) }
  const setCriteriaWeightsHandler = (array) => { setCriteriaWeights(array) }

  const setAlternativesHandler = (array) => { setAlternatives(array) }
  const setAlternativesMTXHandler = (mtx) => { setAlternativesMTX(mtx) }
  const setAlternativesSumHandler = (mtx) => { setAlternativesSum(mtx) }
  const setAlternativesNormMTXHandler = (mtx) => { setAlternativesNormMTX(mtx) }
  const setAlternativesWeightsHandler = (mtx) => { setAlternativesWeights(mtx) }

  const setGlobalWeightsHandler = (mtx) => { setGlobalWeights(mtx) }

  if (loading) {
    return <Loader />
  }

  return(
    <>
      <HelmetProvider>
        <Helmet>
          <title>Новое исследование</title>
        </Helmet>
      </HelmetProvider>
      <div className={style.research_box}>
        <h3 className={style.page_title}>Новое исследование</h3>

        <PhasesSidebar
          phase={phase}
          phasesDone={phasesDone}
          goToPhase={goToPhaseHandler}
        />

        <PhaseTitle
          phase={phase}
          phasesDone={phasesDone}
          nextPhase={nextPhaseHandler}
          previousPhase={previousPhaseHandler}
        />

        <PhaseContent
          phase={phase}
          phasesDone={phasesDone}
          goToPhase={goToPhaseHandler}
          phaseDone={phasesDoneHandler}
          
          allCriteria={allCriteria}
          criteria={criteria}
          criteriaMTX={criteriaMTX}
          criteriaSum={criteriaSum}
          criteriaNormMTX={criteriaNormMTX}
          criteriaWeights={criteriaWeights}
          criteriaSetter={setCriteriaHandler}
          criteriaMTXSetter={setCriteriaMTXHandler}
          criteriaSumSetter={setCriteriaSumHandler}
          criteriaNormMTXSetter={setCriteriaNormMTXHandler}
          criteriaWeightsSetter={setCriteriaWeightsHandler}

          allAlternatives={allAlternatives}
          alternatives={alternatives}
          alternativesMTX={alternativesMTX}
          alternativesSum={alternativesSum}
          alternativesNormMTX={alternativesNormMTX}
          alternativesWeights={alternativesWeights}
          alternativesSetter={setAlternativesHandler}
          alternativesMTXSetter={setAlternativesMTXHandler}
          alternativesSumSetter={setAlternativesSumHandler}
          alternativesNormMTXSetter={setAlternativesNormMTXHandler}
          alternativesWeightsSetter={setAlternativesWeightsHandler}

          globalWeights={globalWeights}
          globalWeightsSetter={setGlobalWeightsHandler}
        />


      </div>
    </>
  )
}

const PhaseContent = ({
  phase,
  phasesDone,
  goToPhase,
  phaseDone,

  allCriteria,
  criteria,
  criteriaMTX,
  criteriaSum,
  criteriaNormMTX,
  criteriaWeights,
  criteriaSetter,
  criteriaMTXSetter,
  criteriaSumSetter,
  criteriaNormMTXSetter,
  criteriaWeightsSetter,

  allAlternatives,
  alternatives,
  alternativesMTX,
  alternativesSum,
  alternativesNormMTX,
  alternativesWeights,
  alternativesSetter,
  alternativesMTXSetter,
  alternativesSumSetter,
  alternativesNormMTXSetter,
  alternativesWeightsSetter,

  globalWeights,
  globalWeightsSetter,
}) => {

  return(
    <>
      {phase === 0 &&
        <SelectionPhase
          allCriteria={allCriteria}
          criteria={criteria}
          criteriaSetter={criteriaSetter}
          criteriaMTXSetter={criteriaMTXSetter}
          criteriaSumSetter={criteriaSumSetter}

          allAlternatives={allAlternatives}
          alternatives={alternatives}
          alternativesSetter={alternativesSetter}
          alternativesMTXSetter={alternativesMTXSetter}
          alternativesSumSetter={alternativesSumSetter}

          goToPhase={goToPhase}
          phaseDone={phaseDone}
        />
      }

      {phase === 1 &&
        <CriteriaRating
          criteria={criteria}
          criteriaMTX={criteriaMTX}
          criteriaMTXSetter={criteriaMTXSetter}
          criteriaSum={criteriaSum}
          criteriaSumSetter={criteriaSumSetter}
          criteriaNormMTXSetter={criteriaNormMTXSetter}
          criteriaWeightsSetter={criteriaWeightsSetter}
          
          goToPhase={goToPhase}
          phaseDone={phaseDone}
          phasesDone={phasesDone}
        />
      }

      {phase === 2 &&
        <CriteriaWeights
          criteria={criteria}
          criteriaNormMTX={criteriaNormMTX}
          criteriaWeights={criteriaWeights}

          goToPhase={goToPhase}
          phaseDone={phaseDone}
        />
      }

      {phase === 3 && 
        <AlternativesRating
          criteria={criteria}
          alternatives={alternatives}
          alternativesMTX={alternativesMTX}
          alternativesMTXSetter={alternativesMTXSetter}
          alternativesSum={alternativesSum}
          alternativesSumSetter={alternativesSumSetter}
          alternativesNormMTXSetter={alternativesNormMTXSetter}
          alternativesWeightsSetter={alternativesWeightsSetter}
          criteriaWeights={criteriaWeights}
          globalWeightsSetter={globalWeightsSetter}

          goToPhase={goToPhase}
          phaseDone={phaseDone}
          phasesDone={phasesDone}
        />
      }

      {phase === 4 &&
        <AlternativesWeights
          criteria={criteria}
          alternatives={alternatives}
          alternativesNormMTX={alternativesNormMTX}
          alternativesWeights={alternativesWeights}

          goToPhase={goToPhase}
          phaseDone={phaseDone}
        />
      }

      {phase === 5 &&
        <GroupsWeights
          criteria={criteria}
          criteriaWeights={criteriaWeights}
          alternatives={alternatives}
          alternativesWeights={alternativesWeights}

          goToPhase={goToPhase}
        />
      }

      {phase === 6 &&
        <GlobalWeights
          criteria={criteria}
          criteriaMTX={criteriaMTX}
          criteriaSum={criteriaSum}
          criteriaNormMTX={criteriaNormMTX}
          criteriaWeights={criteriaWeights}
          alternatives={alternatives}
          alternativesMTX={alternativesMTX}
          alternativesSum={alternativesSum}
          alternativesNormMTX={alternativesNormMTX}
          alternativesWeights={alternativesWeights}
          globalWeights={globalWeights}

          goToPhase={goToPhase}
        />
      }
    </>
  )
}
