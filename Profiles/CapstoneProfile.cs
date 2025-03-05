using AutoMapper;
using CapstoneController.Dtos;
using CapstoneController.Models;

namespace CapstoneController.Profiles{
    public class CapstoneProfile: Profile{
        public CapstoneProfile(){
            // Source -> Target
            CreateMap<TranscriptDto, Transcripts>();
            CreateMap<InterviewDto, Interviews>();
        }
    }
}