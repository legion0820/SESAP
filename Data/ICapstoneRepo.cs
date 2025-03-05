using CapstoneController.Models;

namespace CapstoneController.Data{
    public interface ICapstoneRepo{
        Task SaveChanges();
    
        Task<IEnumerable<Transcripts>> GetAllTranscripts();
        Task CreateTranscript(Transcripts transcripts);

        Task CreateInterview(Interviews interviews);

        void DeleteTranscript(Transcripts transcripts);
    }
}