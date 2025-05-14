using CapstoneController.Data;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace CapstoneController.Models{
    public class Mentions{
        [Key]
        public int mentionId {get; set;}

        [ForeignKey("interviewId")]
        public string? interviewId {get; set;}    // Do I just make it public int? instead?

        [Required]
        public string? themeId {get; set;}   // ??? Same as above

        [Required]
        public string? mentionCount {get; set;} // 

    }
}