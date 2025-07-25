
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, Copy, ExternalLink, Plus, Calendar, BarChart, Globe, Lock } from "lucide-react";
import { CreateSurveyDialog } from "./CreateSurveyDialog";
import { type SurveyFormData } from "@/lib/validation";

interface Survey {
  id: string;
  title: string;
  question: string;
  created_at: string;
  is_public?: boolean;
  testimonial_count?: number;
}

interface SurveysListProps {
  surveys: Survey[];
  isCreateDialogOpen: boolean;
  onCreateDialogChange: (open: boolean) => void;
  formData: SurveyFormData;
  errors: Partial<SurveyFormData>;
  rateLimited: boolean;
  onCreateSurvey: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCopyLink: (url: string) => void;
  onShareLink: (url: string, title: string) => void;
  onTogglePublic: (surveyId: string, currentState: boolean) => void;
  generateSurveyUrl: (surveyId: string) => string;
  loading?: boolean;
}

export const SurveysList = ({
  surveys,
  isCreateDialogOpen,
  onCreateDialogChange,
  formData,
  errors,
  rateLimited,
  onCreateSurvey,
  onChange,
  onCopyLink,
  onShareLink,
  onTogglePublic,
  generateSurveyUrl,
  loading = false
}: SurveysListProps) => {
  if (surveys.length === 0) {
    return (
      <Card className="p-16 bg-gray-900 border border-gray-800 shadow-lg rounded-2xl text-center">
        <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="h-10 w-10 text-purple-500" />
        </div>
        <h3 className="text-2xl font-semibold text-white mb-4">Create your first survey</h3>
        <p className="text-gray-400 mb-8 text-lg leading-relaxed max-w-md mx-auto">
          Start collecting testimonials by creating a survey. Share the link with your customers and watch the social proof roll in.
        </p>
        <CreateSurveyDialog
          isOpen={isCreateDialogOpen}
          onOpenChange={onCreateDialogChange}
          formData={formData}
          errors={errors}
          rateLimited={rateLimited}
          onSubmit={onCreateSurvey}
          onChange={onChange}
          loading={loading}
        />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {surveys.map((survey) => (
        <Card key={survey.id} className="p-8 bg-gray-900 border border-gray-800 shadow-lg hover:shadow-purple-500/20 hover:shadow-xl transition-all duration-300 rounded-2xl group hover:border-purple-500/50">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white truncate">{survey.title}</h3>
                    <div className="flex items-center gap-2">
                      {survey.is_public ? (
                        <div className="flex items-center gap-1 text-green-400 text-sm">
                          <Globe className="h-4 w-4" />
                          <span>Public</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <Lock className="h-4 w-4" />
                          <span>Private</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed line-clamp-2">{survey.question}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Created {new Date(survey.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart className="h-4 w-4" />
                  <span>{survey.testimonial_count || 0} testimonials</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mb-4">
                <Input
                  value={generateSurveyUrl(survey.id)}
                  readOnly
                  className="text-sm bg-gray-800 border-gray-700 font-mono flex-1 text-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCopyLink(generateSurveyUrl(survey.id))}
                  className="rounded-lg border-gray-700 bg-gray-800 hover:bg-purple-600 hover:border-purple-500 px-4 text-gray-300 hover:text-white transition-all duration-200"
                  title="Copy link"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onShareLink(generateSurveyUrl(survey.id), survey.title)}
                  className="rounded-lg border-gray-700 bg-gray-800 hover:bg-purple-600 hover:border-purple-500 px-4 text-gray-300 hover:text-white transition-all duration-200"
                  title="Share link"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onTogglePublic(survey.id, survey.is_public || false)}
                  className={`rounded-lg border-gray-700 px-4 text-sm transition-all duration-200 ${
                    survey.is_public 
                      ? 'bg-green-600 hover:bg-green-700 text-white border-green-500' 
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                  }`}
                >
                  {survey.is_public ? (
                    <>
                      <Globe className="h-4 w-4 mr-2" />
                      Make Private
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Make Public
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
