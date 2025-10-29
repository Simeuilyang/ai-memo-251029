'use server'

import { createServerClient } from '@/lib/supabase/server'
import { Memo, MemoFormData } from '@/types/memo'
import { revalidatePath } from 'next/cache'

// 모든 메모 조회
export async function getMemos(): Promise<Memo[]> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('memos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching memos:', error)
    throw new Error('메모를 불러오는데 실패했습니다.')
  }

  // Supabase 데이터를 Memo 타입으로 변환
  return (data || []).map(memo => ({
    id: memo.id,
    title: memo.title,
    content: memo.content,
    category: memo.category,
    tags: memo.tags || [],
    createdAt: memo.created_at || new Date().toISOString(),
    updatedAt: memo.updated_at || new Date().toISOString(),
  }))
}

// 메모 생성
export async function createMemo(formData: MemoFormData): Promise<Memo> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('memos')
    .insert([
      {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        tags: formData.tags,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Error creating memo:', error)
    throw new Error('메모를 생성하는데 실패했습니다.')
  }

  revalidatePath('/')

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    category: data.category,
    tags: data.tags || [],
    createdAt: data.created_at || new Date().toISOString(),
    updatedAt: data.updated_at || new Date().toISOString(),
  }
}

// 메모 업데이트
export async function updateMemo(
  id: string,
  formData: MemoFormData
): Promise<Memo> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('memos')
    .update({
      title: formData.title,
      content: formData.content,
      category: formData.category,
      tags: formData.tags,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating memo:', error)
    throw new Error('메모를 수정하는데 실패했습니다.')
  }

  revalidatePath('/')

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    category: data.category,
    tags: data.tags || [],
    createdAt: data.created_at || new Date().toISOString(),
    updatedAt: data.updated_at || new Date().toISOString(),
  }
}

// 메모 삭제
export async function deleteMemo(id: string): Promise<void> {
  const supabase = createServerClient()

  const { error } = await supabase.from('memos').delete().eq('id', id)

  if (error) {
    console.error('Error deleting memo:', error)
    throw new Error('메모를 삭제하는데 실패했습니다.')
  }

  revalidatePath('/')
}

// 메모 검색
export async function searchMemos(query: string): Promise<Memo[]> {
  if (!query.trim()) {
    return getMemos()
  }

  const supabase = createServerClient()
  const lowercaseQuery = query.toLowerCase()

  const { data, error } = await supabase
    .from('memos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error searching memos:', error)
    throw new Error('메모를 검색하는데 실패했습니다.')
  }

  // 클라이언트 사이드 필터링 (title, content, tags 검색)
  const filtered = (data || []).filter(
    memo =>
      memo.title.toLowerCase().includes(lowercaseQuery) ||
      memo.content.toLowerCase().includes(lowercaseQuery) ||
      (memo.tags && memo.tags.some((tag: string) => tag.toLowerCase().includes(lowercaseQuery)))
  )

  return filtered.map(memo => ({
    id: memo.id,
    title: memo.title,
    content: memo.content,
    category: memo.category,
    tags: memo.tags || [],
    createdAt: memo.created_at || new Date().toISOString(),
    updatedAt: memo.updated_at || new Date().toISOString(),
  }))
}

// 카테고리별 메모 조회
export async function getMemosByCategory(category: string): Promise<Memo[]> {
  if (category === 'all') {
    return getMemos()
  }

  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('memos')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching memos by category:', error)
    throw new Error('메모를 불러오는데 실패했습니다.')
  }

  return (data || []).map(memo => ({
    id: memo.id,
    title: memo.title,
    content: memo.content,
    category: memo.category,
    tags: memo.tags || [],
    createdAt: memo.created_at || new Date().toISOString(),
    updatedAt: memo.updated_at || new Date().toISOString(),
  }))
}

// 특정 메모 조회
export async function getMemoById(id: string): Promise<Memo | null> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('memos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching memo:', error)
    return null
  }

  if (!data) return null

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    category: data.category,
    tags: data.tags || [],
    createdAt: data.created_at || new Date().toISOString(),
    updatedAt: data.updated_at || new Date().toISOString(),
  }
}

