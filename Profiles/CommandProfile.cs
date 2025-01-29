using AutoMapper;
using CapstoneController.Dtos;
using CapstoneController.Models;

namespace CapstoneController.Profiles{
    public class CommandsProfile: Profile{
        public CommandsProfile(){
            // Source -> Target
            CreateMap<Command, CommandReadDto>();
            CreateMap<CommandCreateDto, Command>();
            CreateMap<CommandUpdateDto, Command>();
        }
    }
}