import { createContext, useContext } from 'react';

// =====================================================
// 1. PreloadContext 생성
// =====================================================
// 서버 환경에서는 다음과 같은 객체를 전달할 예정
//
// {
//     done: false,
//     promises: []
// }
//
// 클라이언트에서는 기본값 null 사용
// =====================================================
const PreloadContext = createContext(null);

// =====================================================
// 2. Preloader 컴포넌트
// =====================================================
// resolve : API 데이터를 가져오는 함수
// =====================================================
export const Preloader = ({ resolve }) => {

    // 상위 Provider가 전달한 Context 값을 가져온다.
    const preloadContext = useContext(PreloadContext);

    // 클라이언트에서는 Provider가 없으므로 null이다.
    // 서버에서 데이터 로딩이 완료된 경우에도 종료한다.
    if (!preloadContext || preloadContext.done) {
        return null;
    }

    // 서버 렌더링 중 API 요청 함수를 실행한다.
    // redux-thunk 액션 생성 함수가 반환한 Promise를
    // promises 배열에 저장한다.
    const promise = resolve();
    
    // Promise가 반환된 경우에만 배열에 추가한다.
    if (promise && typeof promise.then === 'function') {
        preloadContext.promises.push(promise);
    }

    // 이 컴포넌트는 화면에 표시할 UI가 없다.
    return null;
};

// =====================================================
// 3. Context 내보내기
// =====================================================
export default PreloadContext;
