/**
 * 시드 데이터 유틸리티
 * 
 * 주의: 이 파일은 Supabase 마이그레이션 후 더 이상 사용되지 않습니다.
 * 샘플 데이터는 이미 데이터베이스에 삽입되었습니다.
 * 
 * 데이터베이스 시딩은 Supabase MCP를 통해 수행됩니다:
 * - 6개의 샘플 메모가 이미 public.memos 테이블에 삽입되어 있습니다.
 * - 필요 시 SQL 쿼리로 직접 추가/제거할 수 있습니다.
 */

// 샘플 데이터는 이제 데이터베이스에서 관리됩니다.
export const seedSampleData = () => {
  console.log('데이터베이스에서 메모를 불러옵니다.')
  return false
}

export const clearAllData = () => {
  console.log('데이터 삭제는 앱 내에서 수행해주세요.')
}

export const resetToSampleData = () => {
  console.log('데이터 리셋은 SQL 쿼리를 통해 수행해주세요.')
}
