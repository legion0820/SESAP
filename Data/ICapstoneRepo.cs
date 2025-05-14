using CapstoneController.Models;

namespace CapstoneController.Data{
    public interface ICapstoneRepo{
        Task SaveChanges();
    
        Task<IEnumerable<Interviews>> GetAllInterviews();

        Task CreateInterview(Interviews interviews);

        Task<Interviews?> GetInterviewById(int id);

        void DeleteInterview(Interviews interviews);

        //////////////

        Task<IEnumerable<Mentions>> GetAllMentions();

        Task CreateMention(Mentions mentions);

        void DeleteMention(Mentions mentions);

        Task<IEnumerable<Suggestions>> GetAllSuggestions();

        Task CreateSuggestion(Suggestions suggestions);

        void DeleteSuggestion(Suggestions suggestions);

        Task<IEnumerable<Themes>> GetAllThemes();

        Task CreateTheme(Themes themes);

        void DeleteTheme(Themes themes);

    }
}