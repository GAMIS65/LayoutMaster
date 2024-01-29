namespace backend.DTO.Score
{
    public class GetStatsDTO
    {
        public string LayoutName { get; set; }
        public int CharactersTyped { get; set; }
        public List<MistakeValueDTO> MistakeValues { get; set;}
    }

    public class MistakeValueDTO
    {
        public KeyValuePair<char, int> Value { get; set; } = new KeyValuePair<char, int>();
    }
}
