using System.ComponentModel.DataAnnotations;
namespace CapstoneController.Dtos{
    public class VideoDto{

        [Required]
        public string? videoName {get; set;}

    }
}