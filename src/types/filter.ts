// 필터와 관련된 타입 정의입니다.
// 난이도, 장르(태그), 문제유형

export type FilterState = {
  difficulties: ('easy' | 'normal' | 'hard')[];
  genres: string[];
  problemTypes: ('existing' | 'custom')[];
  searchQuery: string;
}

export type FilterOptions = {
  difficulties: Array<{
    value: 'easy' | 'normal' | 'hard';
    label: string;
    icon: string;
  }>;
  genres: Array<{
    value: string;
    label: string;
  }>;
  problemTypes: Array<{
    value: 'existing' | 'custom';
    label: string;
  }>;
}