using CapstoneController.Data;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace CapstoneController.Dtos{
    public class ThemeDto{

        [Required]
        public string? themeName {get; set;}

    }
}