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

        public async Task<IEnumerable<Interviews>> GetAllInterviews(){
            return await _context.Interviews.ToListAsync();
        }

        public async Task CreateInterview(Interviews interviews){
            if (interviews == null){
                throw new ArgumentNullException(nameof(interviews));
            }

            await _context.Interviews.AddAsync(interviews);
        }

        public async Task<Interviews?> GetInterviewById(int id){
            return await _context.Interviews.FirstOrDefaultAsync(c => c.interviewId == id);
        }

        public void DeleteInterview(Interviews interviews){
            if(interviews == null){
                throw new ArgumentNullException(nameof(interviews));
            }

            _context.Interviews.Remove(interviews);
        }

        ///////////////
        
        public async Task<IEnumerable<Mentions>> GetAllMentions(){
            return await _context.Mentions.ToListAsync();
        }

        public async Task CreateMention(Mentions mentions){
            if (mentions == null){
                throw new ArgumentNullException(nameof(mentions));
            }

            await _context.Mentions.AddAsync(mentions);
        }

        public void DeleteMention(Mentions mentions){
            if(mentions == null){
                throw new ArgumentNullException(nameof(mentions));
            }

            _context.Mentions.Remove(mentions);
        }


        public async Task<IEnumerable<Suggestions>> GetAllSuggestions(){
            return await _context.Suggestions.ToListAsync();
        }

        public async Task CreateSuggestion(Suggestions suggestions){
            if (suggestions == null){
                throw new ArgumentNullException(nameof(suggestions));
            }

            await _context.Suggestions.AddAsync(suggestions);
        }

        public void DeleteSuggestion(Suggestions suggestions){
            if(suggestions == null){
                throw new ArgumentNullException(nameof(suggestions));
            }

            _context.Suggestions.Remove(suggestions);
        }


        public async Task<IEnumerable<Themes>> GetAllThemes(){
            return await _context.Themes.ToListAsync();
        }

        public async Task CreateTheme(Themes themes){
            if (themes == null){
                throw new ArgumentNullException(nameof(themes));
            }

            await _context.Themes.AddAsync(themes);
        }

        public void DeleteTheme(Themes themes){
            if(themes == null){
                throw new ArgumentNullException(nameof(themes));
            }

            _context.Themes.Remove(themes);
        }

    }
}