import Anthropic from '@anthropic-ai/sdk';

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('ANTHROPIC_API_KEY 환경 변수가 설정되지 않았습니다.');
}

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Claude 모델 식별자.
 * - 기본값은 최신 부동(floating) 별칭 `claude-sonnet-4-6`
 * - CLAUDE_MODEL 환경변수로 오버라이드 가능 (예: 날짜 고정 버전으로 핀닝)
 */
export const MODEL = process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-6';
export const MAX_TOKENS = 4096;

/**
 * Claude API 요청 타임아웃 (밀리초).
 * - 기본값 90초: 대형 PR(diff 10파일 이상)도 여유있게 처리 가능
 * - PRMATE_TIMEOUT_MS 환경변수로 오버라이드 가능 (예: 빠른 실패용 45000)
 */
export const TIMEOUT_MS = Number(process.env.PRMATE_TIMEOUT_MS) || 90_000;
