using AutoMapper;
using CapstoneController.Dtos;
using CapstoneController.Models;

namespace CapstoneController.Profiles{
    public class CapstoneProfile: Profile{
        public CapstoneProfile(){
            // Source -> Target
            CreateMap<InterviewDto, Interviews>();
            CreateMap<Interviews, InterviewDto>();

            CreateMap<MentionDto, Mentions>();
            CreateMap<Mentions, MentionDto>();

            CreateMap<SuggestionDto, Suggestions>();
            CreateMap<Suggestions, SuggestionDto>();

            CreateMap<ThemeDto, Themes>();
            CreateMap<Themes, ThemeDto>();
        }
    }
}