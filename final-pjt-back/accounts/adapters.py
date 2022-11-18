from allauth.account.adapter import DefaultAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=True):
        user = super().save_user(request, user, form, commit=False)
        data = form.cleaned_data
        user.nickname = data.get('nickname')

        profile_image = data.get('profile_image')
        if profile_image:
            user.profile_image = profile_image
        user.save()
        return user