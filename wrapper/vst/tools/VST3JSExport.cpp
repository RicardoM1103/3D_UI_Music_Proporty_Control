#include <stdio.h>
#include "pluginterfaces/base/ftypes.h"
#include "pluginterfaces/base/funknown.h"
#include "public.sdk/source/vst/vstaudioeffect.h"
#include "pluginterfaces/base/iupdatehandler.h"
#include "pluginterfaces/base/icloneable.h"
#include "pluginterfaces/base/ibstream.h"
#include "pluginterfaces/base/ipluginbase.h"
#include "base/source/fstring.h"
#include "pluginterfaces/vst/ivstcomponent.h"
#include "pluginterfaces/vst/ivstaudioprocessor.h"
#include "pluginterfaces/vst/ivsthostapplication.h"
#include "pluginterfaces/vst/ivsteditcontroller.h"
#include "pluginterfaces/vst/ivstunits.h"
#include "pluginterfaces/test/itest.h"
#include <string>
#include <sstream>
#include "pluginterfaces/base/ustring.h"

Steinberg::IPluginFactory* iPluginFactory;
Steinberg::PFactoryInfo pFactoryInfo;
Steinberg::Vst::IComponent* seletedComponent;
Steinberg::Vst::IAudioProcessor* seletedProcessor;
Steinberg::Vst::IEditController* seletedEditController;
Steinberg::FUnknown* localPluginContext = nullptr;

extern "C" {

	int VST3_init() {
		iPluginFactory = GetPluginFactory();
		iPluginFactory->getFactoryInfo (&pFactoryInfo);
		return -1;
	}
	char const* VST3_classInfo(int nn) {
		Steinberg::PClassInfo pClassInfo;
		iPluginFactory->getClassInfo (nn, &pClassInfo);
		char buffer[999];
		Steinberg::FUID fuid = Steinberg::FUID::fromTUID(pClassInfo.cid);
		Steinberg::char8 strUID[33] = {0};
		fuid.toString (strUID);
		snprintf(buffer, sizeof(buffer)
		         , "{\"name\":\"%s\", \"category\":\"%s\" , \"cid\":\"%s\"}"
		         , pClassInfo.name
		         , pClassInfo.category
		         , strUID
		        );
		char const *p = buffer;
		return p;
	}
	int VST3_parametersCount() {
		return seletedEditController->getParameterCount();
	}
	char const* VST3_parameterInfo(int nn) {
		char buffer[999];
		Steinberg::Vst::ParameterInfo parameterInfo;
		seletedEditController->getParameterInfo (nn, parameterInfo);

		Steinberg::UString128 title16 (parameterInfo.title);
		char title8[128];
		title16.toAscii (title8, 128);

		Steinberg::UString128 shortTitle16 (parameterInfo.shortTitle);
		char shortTitle8[128];
		shortTitle16.toAscii (shortTitle8, 128);

		Steinberg::UString128 units16 (parameterInfo.units);
		char units8[128];
		units16.toAscii (units8, 128);

		snprintf(buffer, sizeof(buffer)
		         , "{\"nn\":\"%d\", \"title\":\"%s\", \"shortTitle\":\"%s\", \"units\":\"%s\", \"flags\":\"%d\"}"
		         , nn
		         , title8//parameterInfo.title
		         , shortTitle8//parameterInfo.shortTitle
		         , units8//parameterInfo.units
		         , parameterInfo.flags
		        );
		char const *p = buffer;
		return p;
	}
	int VST3_selectProcessor(int nn) {
		Steinberg::PClassInfo pClassInfo;
		iPluginFactory->getClassInfo (nn, &pClassInfo);
		int step = 10000;
		int result = iPluginFactory->createInstance (pClassInfo.cid, Steinberg::Vst::IComponent::iid, (void**)&seletedComponent);
		if (result == Steinberg::kResultOk) {
			step = 20000;
			result = seletedComponent->initialize (localPluginContext);
			step = 30000;
			if (seletedComponent->queryInterface (Steinberg::Vst::IEditController::iid, (void**)&seletedEditController) != Steinberg::kResultTrue)
			{
				step = 40000;
				Steinberg::TUID controllerCID;
				result = seletedComponent->getControllerClassId (controllerCID);
				if (result == Steinberg::kResultOk)
				{
					step = 50000;
					result = iPluginFactory->createInstance (controllerCID, Steinberg::Vst::IEditController::iid, (void**)&seletedEditController);
					if (seletedEditController && (result == Steinberg::kResultOk))
					{
						step = 60000;
						result = seletedEditController->initialize (localPluginContext);
						step = 70000;
						Steinberg::FUnknownPtr<Steinberg::Vst::IAudioProcessor> seletedProcessor = seletedComponent;
						if (!seletedProcessor) {
							return false;
						} else {
							step = 80000;
							result = seletedProcessor->getLatencySamples();
							step = 90000;
						}
					}
				}
			}
		}
		return step + result;
	}
	char const* VST3_description() {
		char buffer[999];
		snprintf(buffer, sizeof(buffer), "{\"vendor\":\"%s\", \"count\":\"%d\", \"email\":\"%s\", \"url\":\"%s\"}"
		         , pFactoryInfo.vendor, iPluginFactory->countClasses(), pFactoryInfo.email, pFactoryInfo.url);
		char const *p = buffer;
		return p;
	}
	char const* VST3_setInteger(char* name, int value) {
		char buffer[999];
		snprintf(buffer, sizeof(buffer), "Set integer %s: %d", name, value);
		char const *p = buffer;
		return p;
	}
}


