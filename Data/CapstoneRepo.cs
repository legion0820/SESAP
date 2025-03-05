using Microsoft.EntityFrameworkCore;
using CapstoneController.Models;

namespace CapstoneController.Data{
    public class CapstoneRepo: ICapstoneRepo{

        private readonly AppDbContext _context;

        public CapstoneRepo(AppDbContext context){
            _context = context;
        }

        public async Task SaveChanges(){
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Transcripts>> GetAllTranscripts(){
            return await _context.Transcripts.ToListAsync();
        }
        public async Task CreateTranscript(Transcripts transcripts){
            if(transcripts == null){
                throw new ArgumentNullException(nameof(transcripts));
            }

            await _context.Transcripts.AddAsync(transcripts);
        }

        public async Task CreateInterview(Interviews interviews){
            if (interviews == null){
                throw new ArgumentNullException(nameof(interviews));
            }

            await _context.Interviews.AddAsync(interviews);
        }

        public void DeleteTranscript(Transcripts transcripts){
            if(transcripts == null){
                throw new ArgumentNullException(nameof(transcripts));
            }

            _context.Transcripts.Remove(transcripts);
        }
    }
}