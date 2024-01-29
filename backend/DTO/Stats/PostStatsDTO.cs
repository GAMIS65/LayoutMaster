namespace backend.DTO.Score
{
    public class PostStatsDTO
    {
        public string LayoutName { get; set; }
        public List<KeyValuePair<char, int>> MistakeValues { get; set; }
    }
}
